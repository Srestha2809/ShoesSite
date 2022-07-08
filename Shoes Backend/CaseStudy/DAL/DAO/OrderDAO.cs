using CaseStudy.DAL;
using CaseStudy.DAL.DomainClassess;
using CaseStudy.Helpers;
using Microsoft.EntityFrameworkCore;

namespace CaseStudy.DAL.DAO
{
    public class OrderDAO
    {
        private readonly AppDbContext _db;
        public OrderDAO(AppDbContext ctx)
        {
            _db = ctx;
        }
        public async Task<int> AddOrder(int customerid, OrderSelectionHelper[] selections)
        {
            int orderId = -1;
            // we need a transaction as multiple entities involved
            using (var _trans = await _db.Database.BeginTransactionAsync())
            {
                try
                {
                    Order order = new();
                    order.CustomerId = customerid;
                    order.OrderDate = System.DateTime.Now;
                    order.OrderAmount = 0.0M;
                    // calculate the totals and then add the order row to the table
                    foreach (OrderSelectionHelper selection in selections)
                    {
                        order.OrderAmount += Convert.ToDecimal(selection.Item!.CostPrice * selection.Qty);
                    }

                    await _db.Orders!.AddAsync(order);
                    await _db.SaveChangesAsync();
                    // then add each item to the orderitems table
                    foreach (OrderSelectionHelper selection in selections)
                    {
                        OrderLineItem oItem = new();
                        oItem.Product = selection.Item!;
                        oItem.ProductId = selection.Item!.Id;
                        oItem.SellingPrice = Convert.ToDecimal(selection.Item!.MSRP * selection.Qty);
                        oItem.OrderId = order.Id;
                        if (selection.Qty <= oItem.Product!.QtyOnHand)
                        {
                            oItem.Product!.QtyOnHand -= selection.Qty;
                            oItem.QtySold = selection.Qty;
                            oItem.QtyBackOrdered = 0;
                            oItem.QtyOrdered = selection.Qty;
                        }
                        else
                        {
                            oItem.QtySold = oItem.Product!.QtyOnHand;
                            oItem.Product!.QtyOnBackOrder += (selection.Qty - oItem.Product!.QtyOnHand);
                            oItem.QtyBackOrdered += (selection.Qty - oItem.Product!.QtyOnHand);
                            oItem.Product!.QtyOnHand = 0;
                            oItem.QtyOrdered = selection.Qty;
                        }

                        await _db.OrderLineItems!.AddAsync(oItem);
                        _db.Products!.Update(oItem.Product!);
                        await _db.SaveChangesAsync();
                    }
                    // test trans by uncommenting out these 3 lines
                    //int x = 1;
                    //int y = 0;
                    //x = x / y;
                    await _trans.CommitAsync();
                    orderId = order.Id;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    await _trans.RollbackAsync();
                }
            }
            return orderId;
        }
        public async Task<List<Order>> GetAll(int id)
        {
            return await _db.Orders!.Where(tray => tray.CustomerId == id).ToListAsync<Order>();
        }

        public async Task<List<OrderDetailsHelper>> GetOrderDetails(int tid, string email)
        {
            Customer? user = _db.Customer!.FirstOrDefault(user => user.Email == email);
            List<OrderDetailsHelper> allDetails = new();
            // LINQ way of doing INNER JOINS
            var results = from t in _db.Orders
                          join ti in _db.OrderLineItems! on t.Id equals ti.OrderId
                          join mi in _db.Products! on ti.ProductId equals mi.Id
                          where (t.CustomerId == user!.Id && t.Id == tid)
                          select new OrderDetailsHelper
                          {
                              OrderId = t.Id,
                              CustomerId = user!.Id,
                              SellingPrice = ti.SellingPrice,
                              QtyBackOrdered = ti.QtyBackOrdered,
                              QtyOrdered = ti.QtyOrdered,
                              QtySold = ti.QtySold,
                              ProductId = ti.ProductId,
                              DateCreated = t.OrderDate.ToString("yyyy/MM/dd - hh:mm tt")
                          };
            allDetails = await results.ToListAsync();
            return allDetails;
        }
    }
}

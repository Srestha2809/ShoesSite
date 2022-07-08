using CaseStudy.DAL;
using CaseStudy.DAL.DAO;
using CaseStudy.DAL.DomainClassess;
using CaseStudy.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CaseStudy.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        readonly AppDbContext _ctx;
        public OrderController(AppDbContext context) // injected here
        {
            _ctx = context;
        }
        [HttpPost]
        [Produces("application/json")]
        public async Task<ActionResult<string>> Index(OrderHelper helper)
        {
            string retVal;
            try
            {
                CustomerDAO uDao = new(_ctx);
                Customer? orderOwner = await uDao.GetByEmail(helper.Email);
                OrderDAO oDao = new(_ctx);
                int orderId = await oDao.AddOrder(orderOwner!.Id, helper.Selections!);
                retVal = orderId > 0
                ? "Order " + orderId + " Created! Goods backordered!"
                : "Order not created";
            }
            catch (Exception ex)
            {
                retVal = "Order not created " + ex.Message;
            }
            return retVal;
        }

        [Route("{email}")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<Order>>> List(string email)
        {
            List<Order> trays; ;
            CustomerDAO uDao = new(_ctx);
            Customer? trayOwner = await uDao.GetByEmail(email);
            OrderDAO tDao = new(_ctx);
            trays = await tDao.GetAll(trayOwner!.Id);
            return trays;
        }

        [Route("{trayid}/{email}")]
        [HttpGet]
        public async Task<ActionResult<List<OrderDetailsHelper>>> GetOrderDetails(int trayid, string email)
        {
            OrderDAO dao = new(_ctx);
            return await dao.GetOrderDetails(trayid, email);
        }

    }
}


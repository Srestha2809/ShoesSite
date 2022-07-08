namespace CaseStudy.Helpers
{
    public class OrderDetailsHelper
    {
        public int OrderId { get; set; }
        public String? ProductId { get; set; }
        public int CustomerId { get; set; }
        public string? DateCreated { get; set; }
        public decimal SellingPrice { get; set; }

        public int QtyOrdered { get; set; }
        public int QtySold { get; set; }
        public int QtyBackOrdered { get; set; }


    }
}


using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CaseStudy.DAL.DomainClassess
{
    public class Product
    {
        [Key]
        [StringLength(15)]
        public string? Id { get; set; }
        public int BrandId { get; set; }

        [ForeignKey("BrandId") ]
        public Brand? Brand { get; set; } // generates FK

        [Required]
        [Column(TypeName = "timestamp")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [MaxLength(8)]

        public byte[]? Timer { get; set; }

        [Required]
        [StringLength(50)]
        public string? ProductName { get; set; }

        [Required]
        [StringLength(20)]
        public string? GraphicName { get; set; }

        [Column(TypeName = "money")]
        public float CostPrice { get; set; }

        [Column(TypeName = "money")]
        public float MSRP { get; set; }
       
        public int QtyOnHand { get; set; }
        [Required]
        public int QtyOnBackOrder { get; set; }
        [Required]
       
        
        [StringLength(2000)]
        public string? Description { get; set; }
        

    }
}
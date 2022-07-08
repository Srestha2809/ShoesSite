using CaseStudy.DAL;
using CaseStudy.DAL.DAO;
using CaseStudy.DAL.DomainClassess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CaseStudy.Controllers
{
    [Authorize]

    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        readonly AppDbContext _db;
        public ProductController(AppDbContext context)
        {
            _db = context;
        }
        [HttpGet]
        [Route("{catid}")]
        public async Task<ActionResult<List<Product>>> Index(int catid)
        {
            ProductDAO dao = new(_db);
            List<Product> itemsForCategory = await dao.GetAllByCategory(catid);
            return itemsForCategory;
        }

    }
}

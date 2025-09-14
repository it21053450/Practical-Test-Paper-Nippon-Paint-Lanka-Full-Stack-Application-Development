using Microsoft.AspNetCore.Mvc;
using MaterialManagement.API.DTOs;
using MaterialManagement.API.Services;

namespace MaterialManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaterialsController : ControllerBase
    {
        private readonly IMaterialService _materialService;

        public MaterialsController(IMaterialService materialService)
        {
            _materialService = materialService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMaterials()
        {
            var materials = await _materialService.GetMaterialsAsync();
            return Ok(materials);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMaterial(int id)
        {
            var material = await _materialService.GetMaterialByIdAsync(id);
            
            if (material == null)
            {
                return NotFound();
            }

            return Ok(material);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMaterial([FromBody] MaterialRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var material = await _materialService.CreateMaterialAsync(request);
            return CreatedAtAction(nameof(GetMaterial), new { id = material.Id }, material);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMaterial(int id, [FromBody] MaterialRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var material = await _materialService.UpdateMaterialAsync(id, request);
            
            if (material == null)
            {
                return NotFound();
            }

            return Ok(material);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(int id)
        {
            var result = await _materialService.DeleteMaterialAsync(id);
            
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}

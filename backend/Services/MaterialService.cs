using Microsoft.EntityFrameworkCore;
using MaterialManagement.API.Data;
using MaterialManagement.API.DTOs;
using MaterialManagement.API.Models;

namespace MaterialManagement.API.Services
{
    public class MaterialService : IMaterialService
    {
        private readonly ApplicationDbContext _context;

        public MaterialService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MaterialResponse>> GetMaterialsAsync()
        {
            var materials = await _context.Materials
                .OrderByDescending(m => m.CreatedAt)
                .ToListAsync();

            return materials.Select(MapToResponse);
        }

        public async Task<MaterialResponse?> GetMaterialByIdAsync(int id)
        {
            var material = await _context.Materials
                .FirstOrDefaultAsync(m => m.Id == id);

            return material != null ? MapToResponse(material) : null;
        }

        public async Task<MaterialResponse> CreateMaterialAsync(MaterialRequest request)
        {
            var material = new Material
            {
                Name = request.Name,
                Code = request.Code,
                Batch = request.Batch,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Materials.Add(material);
            await _context.SaveChangesAsync();

            return MapToResponse(material);
        }

        public async Task<MaterialResponse?> UpdateMaterialAsync(int id, MaterialRequest request)
        {
            var material = await _context.Materials
                .FirstOrDefaultAsync(m => m.Id == id);

            if (material == null)
            {
                return null;
            }

            material.Name = request.Name;
            material.Code = request.Code;
            material.Batch = request.Batch;
            material.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return MapToResponse(material);
        }

        public async Task<bool> DeleteMaterialAsync(int id)
        {
            var material = await _context.Materials
                .FirstOrDefaultAsync(m => m.Id == id);

            if (material == null)
            {
                return false;
            }

            _context.Materials.Remove(material);
            await _context.SaveChangesAsync();

            return true;
        }

        private static MaterialResponse MapToResponse(Material material)
        {
            return new MaterialResponse
            {
                Id = material.Id,
                Name = material.Name,
                Code = material.Code,
                Batch = material.Batch,
                CreatedAt = material.CreatedAt,
                UpdatedAt = material.UpdatedAt
            };
        }
    }
}

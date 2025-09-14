using MaterialManagement.API.DTOs;

namespace MaterialManagement.API.Services
{
    public interface IMaterialService
    {
        Task<IEnumerable<MaterialResponse>> GetMaterialsAsync();
        Task<MaterialResponse?> GetMaterialByIdAsync(int id);
        Task<MaterialResponse> CreateMaterialAsync(MaterialRequest request);
        Task<MaterialResponse?> UpdateMaterialAsync(int id, MaterialRequest request);
        Task<bool> DeleteMaterialAsync(int id);
    }
}

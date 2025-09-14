using System.ComponentModel.DataAnnotations;

namespace MaterialManagement.API.DTOs
{
    public class MaterialRequest
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        public string Code { get; set; } = string.Empty;
        
        [Required]
        public string Batch { get; set; } = string.Empty;
    }

    public class MaterialResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string Batch { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}

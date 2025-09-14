using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MaterialManagement.API.Data;
using MaterialManagement.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Material Management API", Version = "v1" });
});

// Add Entity Framework
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Add services
builder.Services.AddScoped<IMaterialService, MaterialService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
// Enable CORS first
app.UseCors("AllowReactApp");

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Material Management API V1");
    c.RoutePrefix = "swagger";
});

// Other middleware
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Add a health check endpoint
app.MapGet("/health", () => "Healthy");

// Default route for root path
app.MapGet("/", () => Results.Ok(new { status = "Material Management API is running!", timestamp = DateTime.UtcNow }));

// Run the application
app.Run();

app.Run();

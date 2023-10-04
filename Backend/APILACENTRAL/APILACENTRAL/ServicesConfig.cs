
using APILACENTRAL.Models.ModelsLaCentral;
using APILACENTRAL.Services;
using APILACENTRAL.Servicios;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using System.Text;

namespace APILACENTRAL
{
    public static class ServicesConfig
    {

        public static void ConfigurarServicios(this IServiceCollection servicios, IConfiguration configuration)
        {

            servicios.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            servicios.AddEndpointsApiExplorer();
            servicios.AddSwaggerGen();


            servicios.AddDbContext<LaCentralContext>(opt =>
            {
                var connectionString = configuration.GetConnectionString("cadenaMysql");
                var serverVersion = new MySqlServerVersion(new Version(8, 0, 26));

                opt.UseMySql(connectionString, serverVersion);
            });

            var key = configuration.GetValue<string>("JwtSettings:key");
            var keyBytes = Encoding.ASCII.GetBytes(key);

            servicios.AddAuthentication(config =>
            {
                config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(config =>
            {
                config.RequireHttpsMetadata = false;
                config.SaveToken = true;
                config.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });

     

            servicios.AddCors(options =>
            {
                options.AddPolicy("newPolicy", app =>
                {
                    app.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

           //services I've made
            servicios.AddScoped<IAutorizationService, AutorizationService>();
            servicios.AddScoped<UserService>();
            servicios.AddScoped<ClientService>();
            servicios.AddScoped<UtilitityService>();
            servicios.AddScoped<MaterialService>();
            servicios.AddScoped<GlassService>();
            servicios.AddScoped<PassepartoutService>();
            servicios.AddScoped<FilletService>();
            servicios.AddScoped<FrameService>();
            servicios.AddScoped<OrderService>();
            servicios.AddScoped<TransactionOrderService>();
            servicios.AddScoped<PieceService>();


        }

    }
}

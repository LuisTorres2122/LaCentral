using APILACENTRAL.Models.ModelsLaCentral;
using APILACENTRAL.Models.Tokens;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace APILACENTRAL.Servicios
{
    public class AutorizationService : IAutorizationService
    {

       private readonly LaCentralContext _context;
        private readonly IConfiguration _configuration;

        public AutorizationService(LaCentralContext context, IConfiguration configuration )
        {
            _context = context;
            _configuration = configuration;
        }

        private string generateToken(string idUser)
        {
            var key = _configuration.GetValue<string>("JwtSettings:key");
            var keyBytes = Encoding.ASCII.GetBytes(key);

            var claims = new ClaimsIdentity();
            claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, idUser));

            var credentialToken = new SigningCredentials(
                new SymmetricSecurityKey(keyBytes),
                SecurityAlgorithms.HmacSha256Signature
                );

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(12),
                SigningCredentials = credentialToken
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);

            string createdToken = tokenHandler.WriteToken(tokenConfig);

            return createdToken;

        }

        public async Task<AutorizationResponse> DevolverToken(AutorizationRequest autorization)
        {
            var foundedUser = _context.Tblusuarios.FirstOrDefault(user =>

                 user.EmailUsuario == autorization.Email &&
                 user.PasswordUsuario == autorization.Password
             );


            if (foundedUser == null)
            {
                return await Task.FromResult<AutorizationResponse>(null);
            }


            string tokenCreado = generateToken(foundedUser.PkIdUsuario.ToString());



            return new AutorizationResponse() { Token = tokenCreado, Resultado = true, Msg = "Ok" };
        }
    }
}

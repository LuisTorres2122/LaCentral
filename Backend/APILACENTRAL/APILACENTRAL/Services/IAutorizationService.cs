using APILACENTRAL.Models.Tokens;

namespace APILACENTRAL.Servicios
{
    public interface IAutorizationService
    {

      Task<AutorizationResponse> DevolverToken(AutorizationRequest autorization);
    }
}

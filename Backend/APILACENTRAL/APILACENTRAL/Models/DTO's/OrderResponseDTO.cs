using APILACENTRAL.Models.ModelsLaCentral;

namespace APILACENTRAL.Models.DTO_s
{
    public class OrderResponseDTO
    {
        public OrderDTO orderHeader { get; set; }
        public List<OrderDetailsDTO> orderDetails { get; set; }
        public List<ServiceDetailsDTO>? serviceDetails { get; set; }
        


    }
}

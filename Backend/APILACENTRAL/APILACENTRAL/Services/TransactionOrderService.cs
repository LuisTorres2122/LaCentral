using APILACENTRAL.Models.DTO_s;
using APILACENTRAL.Models.ModelsLaCentral;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data;

namespace APILACENTRAL.Services
{
    public class TransactionOrderService
    {
        private readonly LaCentralContext _laCentralContext;
        private readonly OrderService _orderService;

        public TransactionOrderService(LaCentralContext laCentralContext, OrderService orderService)
        {
            _laCentralContext = laCentralContext;
            _orderService = orderService;
        }
        public async Task<OrderResponseDTO?> addOrder(OrderResponseDTO response)
        {
            var orderHeader = response.orderHeader;
            var orderDetails = response.orderDetails;
            var serviceDetails = response.serviceDetails;
            var transaction = beginTransaction();
            try
            {

                await _orderService.addOrder(orderHeader);
                await _orderService.addOrderDetails(orderDetails, orderHeader.idPedido);
                if (serviceDetails is not null)
                {
                    await _orderService.addServiceDetails(serviceDetails);
                }


                transaction.Commit();
                return response;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return null;
            }

        }

        public async Task updateOrder(OrderDTO order, int id)
        {
            await _orderService.updateOrder(order, id);
        }

       

        private IDbTransaction beginTransaction()
        {
            var transaction = _laCentralContext.Database.BeginTransaction();

            return transaction.GetDbTransaction();
        }
      
    }
}

using APILACENTRAL.Models.DTO_s;
using APILACENTRAL.Services;
using Microsoft.AspNetCore.Mvc;


namespace APILACENTRAL.Controllers
{
    [Route("Order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly TransactionOrderService _transactionOrderService;
        private readonly OrderService _orderService;

        public OrderController(TransactionOrderService transactionOrderService, OrderService orderService)
        {
            _transactionOrderService = transactionOrderService;
            _orderService = orderService;
        }

        [HttpPost]
        [Route("report")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> getReport(ReportRequest date)
        {
            var report = await _orderService.getReportByDates(date);
            if (report is not null)
            {
                return Ok(report);
            }

            return BadRequest(new { message = "table is empty" });
        }

        [HttpPost]
        public async Task<IActionResult> postOrder(OrderResponseDTO response)
        {
            var createdOrder = await _transactionOrderService.addOrder(response);
            if (createdOrder is not null)
            {
                return Ok(new { message = $"success" });
            }
            return BadRequest(new { message = $"something got wrong" });

        }

        [HttpGet]
        [Route("Order")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> getOrderByname(string name)
        {
            var order = await _orderService.getHeaderOrdersByName(name);
            if (order is not null)
            {
                return Ok(order);
            }

            return BadRequest(new { message = "table is empty" });
        }

        [HttpGet]
        [Route("DetailOrder")]
        public async Task<ActionResult<IEnumerable<OrderDetailsDTO>>> getdetails(int id)
        {
            var order = await _orderService.getDetailsOrder(id);
            if (order is not null)
            {
                return Ok(order);
            }

            return BadRequest(new { message = "table is empty" });
        }

        [HttpGet]
        [Route("pending")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> getPendingOrders()
        {
            var pendingOrders = await _orderService.getPendingOrders();
            if (pendingOrders is not null)
            {
                return Ok(pendingOrders);
            }

            return BadRequest(new { message = "table is empty" });
        }

        [HttpGet]
        [Route("last")]
        public async Task<ActionResult<int>> getLastId()
        {
            var lastid = await _orderService.foundCurrentIdOrder();

            return Ok(new { lastid = lastid });

        }


        [HttpGet]
        [Route("lastDetails")]
        public async Task<ActionResult<int>> getLastIdDetail()
        {
            var lastid = await _orderService.foundCurrentIdDetails();

            return Ok(new { lastid = lastid });

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> putOrder(int id, OrderDTO order)
        {
            var existingOrder = await _orderService.getHeaderOrder(id);


            if (id != order.idPedido)
            {
                return BadRequest(new { message = $"Id = {id} doesn't match with body id = {order.idPedido} " });
            }
            if (existingOrder is not null)
            {
                await _orderService.updateOrder(order, id);
                return Ok(order);
            }
            return NotFound();

        }




    }
}


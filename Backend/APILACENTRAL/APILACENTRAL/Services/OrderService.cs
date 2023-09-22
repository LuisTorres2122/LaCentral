using APILACENTRAL.Models.DTO_s;
using APILACENTRAL.Models.ModelsLaCentral;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.X509;
using System.Data;
using System.Diagnostics.Metrics;

namespace APILACENTRAL.Services
{
    public class OrderService
    {
        private readonly LaCentralContext _laCentralContext;
        private readonly ClientService _clientService;
        private readonly MaterialService _materialService;
        public OrderService(LaCentralContext laCentralContext, ClientService clientService, MaterialService materialService)
        {
            _laCentralContext = laCentralContext;
            _clientService = clientService;
            _materialService = materialService;
        }

        //Get Order and Complement(details)
        public async Task<IEnumerable<Tblencabezadopedido>> getHeaderOrders()
        {
            return await _laCentralContext.Tblencabezadopedidos.ToListAsync();
        }
        public async Task<Tblencabezadopedido?> getHeaderOrder(int id)
        {
            return await _laCentralContext.Tblencabezadopedidos.FindAsync(id);
        }

        public async Task<OrderDetailsDTO?> getDetailsOrder(int id)
        {
            var detail = await _laCentralContext.Tbldetallepedidos.FindAsync(id);

            var foundedDetail = new OrderDetailsDTO();

            foundedDetail.idDetallePedido = detail.PkIdDetallePedido;
            foundedDetail.idPedido = detail.FkIdPedido;
            foundedDetail.Descripcion = detail.DescripcionServicio;
            foundedDetail.Precio = detail.PrecioPedido;

            return foundedDetail;

        }

        public async Task<ServiceDetailsDTO?> getDetailsService(int id)
        {
            var services =  await _laCentralContext.Tbldetalleservicios.FindAsync(id);
            var foundedDetail = new ServiceDetailsDTO();

            foundedDetail.idDetallePedido = services.FkIdDetallePedido;
            foundedDetail.Linea = services.Linea;
            foundedDetail.idMaterial = services.FkIdMaterial;
            foundedDetail.Nombre = services.NombreMaterial;
            foundedDetail.Precio = services.PrecioMaterial;
            foundedDetail.Color = services.ColorMaterial;

            return foundedDetail;

        }

        public async Task<IEnumerable<OrderDTO>> getReport(string comparison)
        {
            var list = new List<Tblencabezadopedido>();
            if (comparison == "daily")
            {
                DateOnly date = DateOnly.FromDateTime(DateTime.Now);

                list = await _laCentralContext.Tblencabezadopedidos.Where(p => p.FechaPedido == date).ToListAsync();
            }
            else if (comparison == "weekly")
            {
                DateOnly date = DateOnly.FromDateTime(DateTime.Now);
                DateOnly startDate = date.DayOfWeek switch
                {
                    DayOfWeek.Sunday => date.AddDays(-6),
                    _ => date.AddDays(1 - (int)date.DayOfWeek)
                };


                DateOnly endDate = startDate.AddDays(6);
                list = await _laCentralContext.Tblencabezadopedidos
                    .Where(p => p.FechaPedido >= startDate && p.FechaPedido <= endDate)
                    .ToListAsync();
            }
            else if (comparison == "monthly")
            {
                DateOnly date = DateOnly.FromDateTime(DateTime.Now);
                DateOnly firstDayOfMonth = new DateOnly(date.Year, date.Month, 1);
                DateOnly lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

                list = await _laCentralContext.Tblencabezadopedidos
                    .Where(p => p.FechaPedido >= firstDayOfMonth && p.FechaPedido <= lastDayOfMonth)
                    .ToListAsync();
            }
            else//default daily response
            {
                DateOnly date = DateOnly.FromDateTime(DateTime.Now);
                list = await _laCentralContext.Tblencabezadopedidos.Where(p => p.FechaPedido == date).ToListAsync();
            }


            var newList = new List<OrderDTO>();
            foreach (var item in list)
            {
                var order = new OrderDTO();
                order.idPedido = item.PkIdPedido;
                order.idCliente = item.FkIdCliente;
                order.Nombre = item.NombreCliente;
                order.Fecha = item.FechaPedido;
                order.Descuento = item.DescuentoPedido;
                order.Abono = item.AbonoPedido;
                order.Total = item.TotalPedido;
                order.Estatus = item.EstatusPedido;
                newList.Add(order);
            }
            return newList;
        }

        public async Task<IEnumerable<OrderDTO>> getPendingOrders()
        {
            var list = await _laCentralContext.Tblencabezadopedidos
                .Where(p => (p.EstatusPedido ? 1 : 0) == 1).ToListAsync();
            var newList = new List<OrderDTO>();
            foreach (var item in list)
            {
                var order = new OrderDTO();
                order.idPedido = item.PkIdPedido;
                order.idCliente = item.FkIdCliente;
                order.Nombre = item.NombreCliente;
                order.Fecha = item.FechaPedido;
                order.Descuento = item.DescuentoPedido;
                order.Abono = item.AbonoPedido;
                order.Total = item.TotalPedido;
                order.Estatus = item.EstatusPedido;
                newList.Add(order);
            }
            return newList;
        }
        //----------------------------------------------------------------------------------------

        //Addorder--------------------------------------------------------------------------------

        public async Task addOrder(OrderDTO orderHeader)
        {
            var newId = await foundCurrentIdOrder();
            var newOrder = new Tblencabezadopedido();
            if (newId == 0)
            {
                newOrder.PkIdPedido = 1;
            }
            else
            {
                newOrder.PkIdPedido = (int)(newId + 1);

            }
            newOrder.FkIdCliente = orderHeader.idCliente;
            newOrder.NombreCliente = orderHeader.Nombre;
            newOrder.FechaPedido = orderHeader.Fecha;
            newOrder.DescuentoPedido = orderHeader.Descuento;
            newOrder.TotalPedido = orderHeader.Total;
            newOrder.AbonoPedido = orderHeader.Abono;
            newOrder.EstatusPedido = orderHeader.Estatus;



            _laCentralContext.Tblencabezadopedidos.Add(newOrder);
            await _laCentralContext.SaveChangesAsync();


        }


        public async Task addOrderDetails(List<OrderDetailsDTO> orderDetails, int id)
        {
            var newId = await foundCurrentIdDetails();
            int count = (int)newId;

            foreach (var detail in orderDetails)
            {

                var newDetails = new Tbldetallepedido();
                if (count < 1)
                {
                    count = 1;
                }
                else
                {
                    count += 1;
                }
                newDetails.PkIdDetallePedido = count;
                newDetails.FkIdPedido = id;
                newDetails.DescripcionServicio = detail.Descripcion;
                newDetails.PrecioPedido = detail.Precio;
                _laCentralContext.Tbldetallepedidos.Add(newDetails);

            }
            await _laCentralContext.SaveChangesAsync();
        }



        public async Task addServiceDetails(List<ServiceDetailsDTO> serviceDetails)
        {

            foreach (var service in serviceDetails)
            {
                var newServiceDetails = new Tbldetalleservicio();
                newServiceDetails.FkIdDetallePedido = service.idDetallePedido;
                newServiceDetails.Linea = service.Linea;
                newServiceDetails.FkIdMaterial = service.idMaterial;
                newServiceDetails.NombreMaterial = service.Nombre;
                newServiceDetails.PrecioMaterial = service.Precio;
                newServiceDetails.ColorMaterial = service.Color;
                _laCentralContext.Tbldetalleservicios.Add(newServiceDetails);
            }
            await _laCentralContext.SaveChangesAsync();

        }

        public async Task updateOrder(OrderDTO orderHeader, int id)
        {

            var order = await getHeaderOrder(id);

            if (order is not null)
            {
                order.AbonoPedido = orderHeader.Abono;
                order.EstatusPedido = orderHeader.Estatus;
                await _laCentralContext.SaveChangesAsync();
            }

        }




        //validations----------------------------------------------------------------
        public async Task<string> validateClient(int id, string name)
        {
            var client = await _clientService.getClient(id);

            if (client is not null)
            {
                if (client.NombreCliente.ToLower() == name.ToLower())
                {
                    return "Valid";
                }
                return "Name doesn't match";
            }
            return "Not found";
        }


        public async Task<int> foundCurrentIdOrder()
        {
            return await _laCentralContext.Tblencabezadopedidos.OrderByDescending(i => i.PkIdPedido).Select(i => i.PkIdPedido).FirstOrDefaultAsync();
        }

        public async Task<int?> foundCurrentIdDetails()
        {
            return await _laCentralContext.Tbldetallepedidos.OrderByDescending(i => i.PkIdDetallePedido).Select(i => i.PkIdDetallePedido).FirstOrDefaultAsync();
        }

        public async Task<string> foundMaterial(int id)
        {
            var existingMaterial = await _materialService.getMaterial(id);

            if (existingMaterial is not null)
            {
                return "Valid";
            }
            return $"material with id = {id} doesn't exist";
        }


    }

}


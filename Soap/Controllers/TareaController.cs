using SoapApi.Models;
using SoapApi.Services;
using System.ServiceModel;

namespace SoapApi.Controllers
{
    [ServiceContract]
    public class TareaController
    {
        private readonly TareaService _service;

        public TareaController()
        {
            _service = new TareaService(new TareaRepository());
        }

        [OperationContract]
        public IEnumerable<Tarea> ObtenerTareas() => _service.ObtenerTareas();

        [OperationContract]
        public Tarea ObtenerTareaPorId(int id) => _service.ObtenerTareaPorId(id);

        [OperationContract]
        public void CrearTarea(string titulo, string descripcion, int empleadoId, DateTime fechaLimite)
        {
            var tarea = new Tarea { Titulo = titulo, Descripcion = descripcion, EmpleadoId = empleadoId, FechaLimite = fechaLimite };
            _service.CrearTarea(tarea);
        }

        [OperationContract]
        public void EliminarTarea(int id) => _service.EliminarTarea(id);
    }
}

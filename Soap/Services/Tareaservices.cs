using SoapApi.Models;
using SoapApi.Repositories;
using System.Collections.Generic;

namespace SoapApi.Services
{
    public class TareaService
    {
        private readonly TareaRepository _repository;

        public TareaService(TareaRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Tarea> ObtenerTareas() => _repository.GetAll();

        public Tarea ObtenerTareaPorId(int id) => _repository.GetById(id);

        public void CrearTarea(Tarea tarea) => _repository.Add(tarea);

        public void EliminarTarea(int id) => _repository.Remove(id);
    }
}

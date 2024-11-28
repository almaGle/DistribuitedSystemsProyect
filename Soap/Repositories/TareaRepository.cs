using SoapApi.Models;
using System.Collections.Generic;

namespace SoapApi.Repositories
{
    public class TareaRepository
    {
        private readonly List<Tarea> _tareas = new List<Tarea>();

        public IEnumerable<Tarea> GetAll() => _tareas;

        public Tarea GetById(int id) => _tareas.Find(t => t.Id == id);

        public void Add(Tarea tarea) => _tareas.Add(tarea);

        public void Remove(int id) => _tareas.RemoveAll(t => t.Id == id);
    }
}

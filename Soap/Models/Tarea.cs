namespace SoapApi.Models
{
    public class Tarea
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public int EmpleadoId { get; set; }
        public DateTime FechaLimite { get; set; }
    }
}

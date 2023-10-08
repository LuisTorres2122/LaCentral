using System.ComponentModel.DataAnnotations;

namespace APILACENTRAL.Models.DTO_s
{
    public class PassepartoutDTO
    {

        public int PkIdPassepartout { get; set; }

        public int FKIdMaterial { get; set; }

        public string CodigoPassepartout { get; set; }
        
        public string ColorPassepartout { get; set; } = null!;
    }

    public class SPassepartoutDTO
    {

        public int PkIdPassepartout { get; set; }

        public string NombreMaterial { get; set; }

        public string CodigoPassepartout { get; set; }
       
        public string ColorPassepartout { get; set; } = null!;
    }
}

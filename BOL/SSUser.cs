using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace BOL
{
    //Install the package first :
    //Microsoft.Extensions.Identity.Stores

    [Table("SSUser")]
    public class SSUser : IdentityUser
    {
        [Required]
        public DateTime DOB { get; set; }
        public string? ProfilePicPath { get; set; }

        public IEnumerable<Story>? Stories { get; set; }
    }
}
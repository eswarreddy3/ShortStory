using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BOL
{
    [Table("Story")]
    public class Story
    {
        [Key]
        public int SSId { get; set; }
        [Required]
        public string? SSTitle { get; set; }
        [Required]
        public string? SSDescription { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsApproved { get; set; }
        public int Like { get; set; }
        public int Dislike { get; set; }

        [ForeignKey("SSUserNav")]
        public string? Id { get; set; }
        public SSUser? SSUserNav { get; set; }

        [ForeignKey("CategoryNav")]
        public int? CategoryId { get; set; }
        public Category? CategoryNav { get; set; }
    }
}

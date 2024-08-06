using System.Collections.Generic;
using BOL;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    //Step 1: Add BOL Ref
    //Step 2: Install EF Core Packages:
    //Microsoft.EntityFrameworkCore.SqlServer
    //Microsoft.EntityFrameworkCore.Tools
    //Microsoft.AspNetCore.Identity.EntityFrameworkCore
    public class SSDbContext : IdentityDbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(@"Server=DESKTOP-03IS2J7\SQLEXPRESS;Database=SSDb_6;Trusted_Connection=True;");
        }
        public DbSet<Story>? Stories { get; set; }
        public DbSet<Category>? categories { get; set; }
    }

}
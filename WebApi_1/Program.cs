using BOL;
using DAL;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//Step 1: Add Ref Of BOL and DAL

//Step 2: Add Services
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddDbContext<SSDbContext>();
builder.Services.AddIdentity<SSUser, IdentityRole>()
                .AddEntityFrameworkStores<SSDbContext>()
                .AddDefaultTokenProviders();

//Step-1: Create signingKey from Secretkey
var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is the JWT Security Token Authentication"));

//Step-2:Create Validation Parameters using signingKey
var tokenValidationParameters = new TokenValidationParameters()
{
    IssuerSigningKey = signingKey,
    ValidateIssuer = false,
    ValidateAudience = false,
    ClockSkew = TimeSpan.Zero
};

//Step-3: Set Authentication Type as JwtBearer
builder.Services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
})
        //Step-4: Set Validation Parameter created above
        .AddJwtBearer(jwt =>
        {
            jwt.TokenValidationParameters = tokenValidationParameters;
        });

var app = builder.Build();

//Step 3: Add mapControllers
app.UseCors(x => x.WithOrigins("http://localhost:4200")
                              .AllowAnyMethod()
                              .AllowAnyHeader()
                              .AllowCredentials());
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

//Step 4: Add Pacakage
//Microsoft.VisualStudio.Web.CodeGeneration.Design

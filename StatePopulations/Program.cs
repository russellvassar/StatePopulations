using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

SqlConnectionStringBuilder sqlConnBuilder = new(builder.Configuration["ConnectionStrings:States"]);
sqlConnBuilder.Password = builder.Configuration["DbPassword"];
sqlConnBuilder.UserID = builder.Configuration["DbUserName"];
builder.Services.AddDbContext<StatePopulations.StatesContext>(options =>
{
    options.UseSqlServer(sqlConnBuilder.ConnectionString, x => x.UseNetTopologySuite());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();

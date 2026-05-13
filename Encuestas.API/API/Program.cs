using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using DA;
using DA.Repositorios;
using Flujo;

//el program.cs maneja el ciclo de vida de la aplicación, es lo primero que se ejecuta, decide qué, como y en que orden
//crea aplicación web y le va agregando servicios 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

//swagger es una herramienta de documentacion las api restful
builder.Services.AddSwaggerGen();

//inyecciones de dependencias
builder.Services.AddScoped<IEncuestaFlujo, EncuestaFlujo>();
builder.Services.AddScoped<IEncuestaDA, EncuestaDA>();

builder.Services.AddScoped<IPreguntaFlujo, PreguntaFlujo>();
builder.Services.AddScoped<IPreguntaDA, PreguntaDA>();

builder.Services.AddScoped<IRespuestaFlujo, RespuestaFlujo>();
builder.Services.AddScoped<IRespuestaDA, RespuestaDA>();

builder.Services.AddScoped<ISeguimientoFlujo, SeguimientoFlujo>();
builder.Services.AddScoped<ISeguimientoDA, SeguimientoDA>();

builder.Services.AddScoped<ISeguimientoComentarioFlujo, SeguimientoComentarioFlujo>();
builder.Services.AddScoped<ISeguimientoComentarioDA, SeguimientoComentarioDA>();

builder.Services.AddScoped<IDashboardFlujo, DashboardFlujo>();
builder.Services.AddScoped<IDashboardDA, DashboardDA>();

builder.Services.AddScoped<IEncuestaDapper, RepositorioDapper>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
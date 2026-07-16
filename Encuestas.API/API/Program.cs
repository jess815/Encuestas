using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using DA;
using DA.Repositorios;
using Flujo;

// el program.cs maneja el ciclo de vida de la aplicacion
// aqui se registran los servicios que usa el api

var builder = WebApplication.CreateBuilder(args);

// agrega los controladores del api
builder.Services.AddControllers();

// agrega swagger para probar y documentar el api
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// inyecciones de dependencias

// areas y encuestas
builder.Services.AddScoped<IEncuestaFlujo, EncuestaFlujo>();
builder.Services.AddScoped<IEncuestaDA, EncuestaDA>();

// preguntas de las encuestas
builder.Services.AddScoped<IPreguntaFlujo, PreguntaFlujo>();
builder.Services.AddScoped<IPreguntaDA, PreguntaDA>();

// opciones de respuesta
builder.Services.AddScoped<IOpcionFlujo, OpcionFlujo>();
builder.Services.AddScoped<IOpcionDA, OpcionDA>();

// respuestas registradas
builder.Services.AddScoped<IRespuestaFlujo, RespuestaFlujo>();
builder.Services.AddScoped<IRespuestaDA, RespuestaDA>();

// seguimientos de encuestas
builder.Services.AddScoped<ISeguimientoFlujo, SeguimientoFlujo>();
builder.Services.AddScoped<ISeguimientoDA, SeguimientoDA>();

// comentarios de seguimientos
builder.Services.AddScoped<ISeguimientoComentarioFlujo, SeguimientoComentarioFlujo>();
builder.Services.AddScoped<ISeguimientoComentarioDA, SeguimientoComentarioDA>();

// dashboard
builder.Services.AddScoped<IDashboardFlujo, DashboardFlujo>();
builder.Services.AddScoped<IDashboardDA, DashboardDA>();

// usuarios y permisos
builder.Services.AddScoped<IUsuarioFlujo, UsuarioFlujo>();
builder.Services.AddScoped<IUsuarioDA, UsuarioDA>();

// bitacora del sistema
builder.Services.AddScoped<IBitacoraFlujo, BitacoraFlujo>();
builder.Services.AddScoped<IBitacoraDA, BitacoraDA>();

// conexion con sql server usando dapper
builder.Services.AddScoped<IEncuestaDapper, RepositorioDapper>();


var app = builder.Build();

// habilita swagger solo en desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
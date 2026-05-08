create table usuarios (  

idusuario int identity(1,1) primary key,  

nombre varchar(150) not null,  

usuario varchar(50) not null unique,  

 passwordhash varchar(255) not null,  

administrador bit default 0,  

editaencuesta bit default 0,  

exportaexcel bit default 0,  

activo bit default 1,  

fechacreacion datetime default getdate());  

 

create table areas (  

idarea int identity(1,1) primary key,  

nombre varchar(100) not null,  

tipo varchar(20) not null,  

activo bit default 1,  

fechacreacion datetime default getdate());  

 

  

create table usuarioarea (  

idusuarioarea int identity(1,1) primary key,  

idusuario int not null,  

idarea int not null,  

verarea bit default 1,  

 

  

foreign key (idusuario) references usuarios(idusuario),  

foreign key (idarea) references areas(idarea)); 

 

  

 

create table preguntas (  

idpregunta int identity(1,1) primary key,  

idarea int not null,  

texto varchar(300) not null,  

ordenpregunta int not null,  

activo bit default 1,  

fechacreacion datetime default getdate(),  

foreign key (idarea) references areas(idarea) ); 

 

create table opciones (  

idopcion int identity(1,1) primary key,  

texto varchar(50) not null,  

valor int not null,  

ordenvisual int not null,  

activo bit default 1);  

 

create table correosarea (  

idcorreoarea int identity(1,1) primary key,  

idarea int not null,  

correo varchar(150) not null,  

activo bit default 1,  

foreign key (idarea) references areas(idarea)); 

 

create table respuestas (  

idrespuesta int identity(1,1) primary key,  

idarea int not null,  

nombresocio varchar(150) null,  

evento varchar(150) null,  

fechaevento date null,  

comentario varchar(max) null,  

notageneral decimal(5,2) null,  

alerta bit default 0,  

fecharespuesta datetime default getdate(),  

foreign key (idarea) references areas(idarea));  

 

create table respuestadetalle (  

idrespuestadetalle int identity(1,1) primary key,  

idrespuesta int not null,  

idpregunta int not null,  

idopcion int not null,  

valorcalculado int not null,  

foreign key (idrespuesta) references respuestas(idrespuesta),  

foreign key (idpregunta) references preguntas(idpregunta),  

foreign key (idopcion) references opciones(idopcion));  

 

  

 

create table seguimientos (  

idseguimiento int identity(1,1) primary key,  

idrespuesta int not null unique,  

estado varchar(30) not null default 'en seguimiento',  

fechacreacion datetime default getdate(),  

fecharesolucion datetime null,  

foreign key (idrespuesta) references respuestas(idrespuesta));  

 

create table seguimientocomentarios (  

idseguimientocomentario int identity(1,1) primary key,  

idseguimiento int not null,  

idusuario int not null,  

comentario varchar(max) not null,  

fechacomentario datetime default getdate(),  

foreign key (idseguimiento) references seguimientos(idseguimiento),  

foreign key (idusuario) references usuarios(idusuario));  

 

create table bitacora (  

idbitacora int identity(1,1) primary key,  

idusuario int not null,  

modulo varchar(100) not null,  

accion varchar(200) not null,  

detalle varchar(max) null,  

fechaaccion datetime default getdate(),  

foreign key (idusuario) references usuarios(idusuario) );  

SELECT TOP (1000) [idOpcion]
      ,[Texto]
      ,[Valor]
      ,[OrdenVisual]
      ,[Activo]
  FROM [Encuestas].[dbo].[Opciones]

  insert into opciones (texto, valor, ordenvisual, activo)
values
('Excelente', 100, 1, 1),
('Muy bueno', 75, 2, 1),
('Adecuado', 50, 3, 1),
('Deficiente', 25, 4, 1),
('Muy deficiente', 0, 5, 1);

select top (1000) [idpregunta]
      ,[idarea]
      ,[texto]
      ,[ordenpregunta]
      ,[activo]
      ,[fechacreacion]
  from [encuestas].[dbo].[preguntas]


  insert into preguntas (idarea, texto, ordenpregunta, activo)
values
(1, 'Amabilidad del personal de servicio', 1, 1),
(1, 'Rapidez en la atención', 2, 1),
(1, 'Rapidez del servicio de alimentos', 3, 1),
(1, 'Rapidez del servicio de bebidas', 4, 1),
(1, 'Presentación de los alimentos', 5, 1),
(1, 'Presentación de las bebidas', 6, 1),
(1, 'Sabor y calidad de la comida', 7, 1),
(1, 'Temperatura adecuada de los alimentos', 8, 1),
(1, 'Limpieza del salón y mesas', 9, 1),
(1, 'Relación calidad-precio', 10, 1),
(1, 'Satisfacción general de la visita', 11, 1);

insert into preguntas (idarea, texto, ordenpregunta, activo)
select 2, texto, ordenpregunta, activo
from preguntas
where idarea = 1;

insert into preguntas (idarea, texto, ordenpregunta, activo)
select 3, texto, ordenpregunta, activo
from preguntas
where idarea = 1;

insert into preguntas (idarea, texto, ordenpregunta, activo)
select 4, texto, ordenpregunta, activo
from preguntas
where idarea = 1;

insert into preguntas (idarea, texto, ordenpregunta, activo)
select 5, texto, ordenpregunta, activo
from preguntas
where idarea = 1;


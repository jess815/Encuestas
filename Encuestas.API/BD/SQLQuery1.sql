create table Usuarios
(idUsuario int identity (1,1) primary key,
Nombre varchar(150) not null,
Usuario varchar(50) not null unique,
PasswordHash varchar(255) not null,
Administrador bit default 0,
EditaEncuesta bit default 0,
ExportaExcel bit default 0,
Activo bit default 1,
FechaCreacion datetime default getdate());

create table Areas
(idArea int identity(1,1) primary key, 
Nombre varchar(100) not null, 
Tipo varchar(20) not null, 
Activo bit default 1, 
FechaCreacion datetime default getdate()); 

create table UsuarioArea ( 
idUsuarioArea int identity(1,1) primary key, 
idUsuario int not null, 
idArea int not null, 
VerArea bit default 1, 
foreign key (idUsuario) references Usuarios(idUsuario), 
foreign key (idArea) references Areas(idArea));

create table Preguntas ( 
idPregunta int identity(1,1) primary key, 
idArea int not null, 
Texto varchar(300) not null, 
OrdenPregunta int not null, 
Activo bit default 1, 
FechaCreacion datetime default getdate(), 
foreign key (idArea) references Areas(idArea) );

create table Opciones ( 
idOpcion int identity(1,1) primary key, 
Texto varchar(50) not null, 
Valor int not null, 
OrdenVisual int not null, 
Activo bit default 1); 

create table CorreosArea ( 
idCorreoArea int identity(1,1) primary key, 
idArea int not null, 
Correo varchar(150) not null, 
Activo bit default 1, 
foreign key (idArea) references Areas(idArea));

create table Respuestas ( 
idRespuesta int identity(1,1) primary key, 
idArea int not null, 
NombreSocio varchar(150) null, 
Evento varchar(150) null, 
FechaEvento date null, 
Comentario varchar(max) null, 
NotaGeneral decimal(5,2) null, 
Alerta bit default 0, 
FechaRespuesta datetime default getdate(), 
foreign key (idArea) references Areas(idArea)); 

create table RespuestaDetalle ( 
idRespuestaDetalle int identity(1,1) primary key, 
idRespuesta int not null, 
idPregunta int not null, 
idOpcion int not null, 
ValorCalculado int not null, 
foreign key (idRespuesta) references Respuestas(idRespuesta), 
foreign key (idPregunta) references Preguntas(idPregunta), 
foreign key (idOpcion) references Opciones(idOpcion)); 

create table Seguimientos ( 
idSeguimiento int identity(1,1) primary key, 
idRespuesta int not null unique, 
Estado varchar(30) not null default 'En seguimiento', 
FechaCreacion datetime default getdate(), 
FechaResolucion datetime null, 
foreign key (idrespuesta) references Respuestas(idRespuesta)); 

create table SeguimientoComentarios ( 
idSeguimientoComentario int identity(1,1) primary key, 
idSeguimiento int not null, 
idUsuario int not null, 
Comentario varchar(max) not null, 
FechaComentario datetime default getdate(), 
foreign key (idSeguimiento) references Seguimientos(idSeguimiento), 
foreign key (idUsuario) references Usuarios(idUsuario)); 

create table Bitacora ( 
idBitacora int identity(1,1) primary key, 
idUsuario int not null, 
Modulo varchar(100) not null, 
Accion varchar(200) not null, 
Detalle varchar(max) null, 
FechaAccion datetime default getdate(), 
foreign key (idusuario) references Usuarios(idUsuario));
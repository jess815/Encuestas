CREATE TABLE [dbo].[Usuarios] (
    [idUsuario]     INT           IDENTITY (1, 1) NOT NULL,
    [Nombre]        VARCHAR (150) NOT NULL,
    [Usuario]       VARCHAR (50)  NOT NULL,
    [PasswordHash]  VARCHAR (255) NOT NULL,
    [Administrador] BIT           DEFAULT ((0)) NULL,
    [EditaEncuesta] BIT           DEFAULT ((0)) NULL,
    [ExportaExcel]  BIT           DEFAULT ((0)) NULL,
    [Activo]        BIT           DEFAULT ((1)) NULL,
    [FechaCreacion] DATETIME      DEFAULT (getdate()) NULL,
    PRIMARY KEY CLUSTERED ([idUsuario] ASC),
    UNIQUE NONCLUSTERED ([Usuario] ASC)
);


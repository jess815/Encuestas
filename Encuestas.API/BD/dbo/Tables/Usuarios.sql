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
    [Ceibo]         BIT           CONSTRAINT [DF_Usuarios_Ceibo] DEFAULT ((0)) NOT NULL,
    [Faroles]       BIT           CONSTRAINT [DF_Usuarios_Faroles] DEFAULT ((0)) NOT NULL,
    [Hoyo19]        BIT           CONSTRAINT [DF_Usuarios_Hoyo19] DEFAULT ((0)) NOT NULL,
    [PinRojo]       BIT           CONSTRAINT [DF_Usuarios_PinRojo] DEFAULT ((0)) NOT NULL,
    [CanaBrava]     BIT           CONSTRAINT [DF_Usuarios_CanaBrava] DEFAULT ((0)) NOT NULL,
    [Eventos]       BIT           CONSTRAINT [DF_Usuarios_Eventos] DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([idUsuario] ASC),
    UNIQUE NONCLUSTERED ([Usuario] ASC)
);


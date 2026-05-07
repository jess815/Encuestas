CREATE TABLE [dbo].[UsuarioArea] (
    [idUsuarioArea] INT IDENTITY (1, 1) NOT NULL,
    [idUsuario]     INT NOT NULL,
    [idArea]        INT NOT NULL,
    [VerArea]       BIT DEFAULT ((1)) NULL,
    PRIMARY KEY CLUSTERED ([idUsuarioArea] ASC),
    FOREIGN KEY ([idArea]) REFERENCES [dbo].[Areas] ([idArea]),
    FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuarios] ([idUsuario])
);


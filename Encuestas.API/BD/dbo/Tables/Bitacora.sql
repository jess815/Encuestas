CREATE TABLE [dbo].[Bitacora] (
    [idBitacora]  INT           IDENTITY (1, 1) NOT NULL,
    [idUsuario]   INT           NOT NULL,
    [Modulo]      VARCHAR (100) NOT NULL,
    [Accion]      VARCHAR (200) NOT NULL,
    [Detalle]     VARCHAR (MAX) NULL,
    [FechaAccion] DATETIME      DEFAULT (getdate()) NULL,
    PRIMARY KEY CLUSTERED ([idBitacora] ASC),
    FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuarios] ([idUsuario])
);


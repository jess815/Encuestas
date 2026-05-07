CREATE TABLE [dbo].[Opciones] (
    [idOpcion]    INT          IDENTITY (1, 1) NOT NULL,
    [Texto]       VARCHAR (50) NOT NULL,
    [Valor]       INT          NOT NULL,
    [OrdenVisual] INT          NOT NULL,
    [Activo]      BIT          DEFAULT ((1)) NULL,
    PRIMARY KEY CLUSTERED ([idOpcion] ASC)
);


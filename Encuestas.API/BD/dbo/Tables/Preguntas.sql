CREATE TABLE [dbo].[Preguntas] (
    [idPregunta]    INT           IDENTITY (1, 1) NOT NULL,
    [idArea]        INT           NOT NULL,
    [Texto]         VARCHAR (300) NOT NULL,
    [OrdenPregunta] INT           NOT NULL,
    [Activo]        BIT           DEFAULT ((1)) NULL,
    [FechaCreacion] DATETIME      DEFAULT (getdate()) NULL,
    PRIMARY KEY CLUSTERED ([idPregunta] ASC),
    FOREIGN KEY ([idArea]) REFERENCES [dbo].[Areas] ([idArea])
);


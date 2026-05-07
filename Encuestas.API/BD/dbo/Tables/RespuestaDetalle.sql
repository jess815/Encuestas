CREATE TABLE [dbo].[RespuestaDetalle] (
    [idRespuestaDetalle] INT IDENTITY (1, 1) NOT NULL,
    [idRespuesta]        INT NOT NULL,
    [idPregunta]         INT NOT NULL,
    [idOpcion]           INT NOT NULL,
    [ValorCalculado]     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([idRespuestaDetalle] ASC),
    FOREIGN KEY ([idOpcion]) REFERENCES [dbo].[Opciones] ([idOpcion]),
    FOREIGN KEY ([idPregunta]) REFERENCES [dbo].[Preguntas] ([idPregunta]),
    FOREIGN KEY ([idRespuesta]) REFERENCES [dbo].[Respuestas] ([idRespuesta])
);


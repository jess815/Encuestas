CREATE TABLE [dbo].[RespuestaDetalle] (
    [idRespuestaDetalle] INT IDENTITY (1, 1) NOT NULL,
    [idRespuesta]        INT NOT NULL,
    [idPregunta]         INT NOT NULL,
    [idOpcion]           INT NOT NULL,
    [ValorCalculado]     INT NOT NULL,
    PRIMARY KEY CLUSTERED ([idRespuestaDetalle] ASC),
    FOREIGN KEY ([idOpcion]) REFERENCES [dbo].[Opciones] ([idOpcion]),
    FOREIGN KEY ([idPregunta]) REFERENCES [dbo].[Preguntas] ([idPregunta]),
    CONSTRAINT [FK__Respuesta__idRes__628FA481] FOREIGN KEY ([idRespuesta]) REFERENCES [dbo].[Respuestas] ([idRespuesta]) ON DELETE CASCADE
);


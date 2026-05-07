CREATE TABLE [dbo].[Respuestas] (
    [idRespuesta]    INT            IDENTITY (1, 1) NOT NULL,
    [idArea]         INT            NOT NULL,
    [NombreSocio]    VARCHAR (150)  NULL,
    [Evento]         VARCHAR (150)  NULL,
    [FechaEvento]    DATE           NULL,
    [Comentario]     VARCHAR (MAX)  NULL,
    [NotaGeneral]    DECIMAL (5, 2) NULL,
    [Alerta]         BIT            DEFAULT ((0)) NULL,
    [FechaRespuesta] DATETIME       DEFAULT (getdate()) NULL,
    PRIMARY KEY CLUSTERED ([idRespuesta] ASC),
    FOREIGN KEY ([idArea]) REFERENCES [dbo].[Areas] ([idArea])
);


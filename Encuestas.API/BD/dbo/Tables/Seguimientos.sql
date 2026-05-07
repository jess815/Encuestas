CREATE TABLE [dbo].[Seguimientos] (
    [idSeguimiento]   INT          IDENTITY (1, 1) NOT NULL,
    [idRespuesta]     INT          NOT NULL,
    [Estado]          VARCHAR (30) DEFAULT ('En seguimiento') NOT NULL,
    [FechaCreacion]   DATETIME     DEFAULT (getdate()) NULL,
    [FechaResolucion] DATETIME     NULL,
    PRIMARY KEY CLUSTERED ([idSeguimiento] ASC),
    FOREIGN KEY ([idRespuesta]) REFERENCES [dbo].[Respuestas] ([idRespuesta]),
    UNIQUE NONCLUSTERED ([idRespuesta] ASC)
);


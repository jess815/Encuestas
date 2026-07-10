CREATE TABLE [dbo].[SeguimientoComentarios] (
    [idSeguimientoComentario] INT           IDENTITY (1, 1) NOT NULL,
    [idSeguimiento]           INT           NOT NULL,
    [idUsuario]               INT           NOT NULL,
    [Comentario]              VARCHAR (MAX) NOT NULL,
    [FechaComentario]         DATETIME      DEFAULT (getdate()) NULL,
    PRIMARY KEY CLUSTERED ([idSeguimientoComentario] ASC),
    FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuarios] ([idUsuario]),
    CONSTRAINT [FK__Seguimien__idSeg__6E01572D] FOREIGN KEY ([idSeguimiento]) REFERENCES [dbo].[Seguimientos] ([idSeguimiento]) ON DELETE CASCADE ON UPDATE CASCADE
);


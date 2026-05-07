CREATE TABLE [dbo].[CorreosArea] (
    [idCorreoArea] INT           IDENTITY (1, 1) NOT NULL,
    [idArea]       INT           NOT NULL,
    [Correo]       VARCHAR (150) NOT NULL,
    [Activo]       BIT           DEFAULT ((1)) NULL,
    PRIMARY KEY CLUSTERED ([idCorreoArea] ASC),
    FOREIGN KEY ([idArea]) REFERENCES [dbo].[Areas] ([idArea])
);


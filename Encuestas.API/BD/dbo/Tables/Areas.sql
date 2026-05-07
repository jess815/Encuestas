CREATE TABLE [dbo].[Areas] (
    [idArea]        INT           IDENTITY (1, 1) NOT NULL,
    [Nombre]        VARCHAR (100) NOT NULL,
    [Tipo]          VARCHAR (20)  NOT NULL,
    [Activo]        BIT           DEFAULT ((1)) NULL,
    [FechaCreacion] DATETIME      DEFAULT (getdate()) NULL,
    PRIMARY KEY CLUSTERED ([idArea] ASC)
);


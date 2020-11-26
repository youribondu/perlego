export const QUERY_GET_BOOKS = (skip) =>
  `SELECT Title_DistinctivetitlebookCovertitle_TitleText as title, CONCAT('https://www.perlego.com/', Location, Cover_File) as cover, Contributor1_PersonName as author1, Contributor2_PersonName as author2, Contributor3_PersonName as author3 FROM assessment2 LIMIT 12 OFFSET ${skip};`;

export const QUERY_GET_BOOKS_COUNT = `SELECT count(*) as total FROM assessment2`;

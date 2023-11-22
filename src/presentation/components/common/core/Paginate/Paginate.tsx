import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Button, Pagination } from "react-bootstrap";

interface IPaginationProps {
  page: string;
  limit: number;
  total: number;
  maxPreviousPages?: number;
  maxNextPages?: number;
}

export default function Paginate({
  page,
  limit,
  total,
  maxPreviousPages = 5,
  maxNextPages = 5,
}: IPaginationProps) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(parseInt(page, 10));
  const [nextPages, setNextPages] = useState<number[]>([]);
  const [previousPages, setPreviousPages] = useState<number[]>([]);

  const onChangePage = (page: number) => {
    let locationSearch = window.location.search;

    if (router.query.page) {
      locationSearch = locationSearch.replace(
        `page=${currentPage}`,
        `page=${page}`
      );
    } else {
      locationSearch = locationSearch
        ? `${locationSearch}&page=${page}`
        : `?page=${page}`;
    }

    router.push(window.location.pathname + locationSearch);
  };

  const getNextPages = useCallback(() => {
    if (maxNextPages >= currentPage) {
      const nextPagesArray: number[] = [];

      for (
        let nextPage = currentPage + 1;
        nextPage < currentPage + maxNextPages;
        nextPage++
      ) {
        const currentTotal: number = nextPage * limit;

        if (currentTotal > total) break;

        if (currentTotal <= total && nextPagesArray.indexOf(nextPage) < 0) {
          nextPagesArray.push(nextPage);
        }
      }

      setNextPages(nextPagesArray);
    }
  }, [currentPage, limit, maxNextPages, total]);

  const getPreviousPages = useCallback(() => {
    if (currentPage > 1) {
      const previousPagesArray: number[] = [];

      let lastPreviousPage = currentPage - maxPreviousPages;
      lastPreviousPage = lastPreviousPage < 0 ? 0 : lastPreviousPage;

      for (
        let previousPage = currentPage - 1;
        previousPage > lastPreviousPage;
        previousPage--
      ) {
        const currentTotal: number = previousPage * limit;

        if (currentTotal > total) break;

        if (
          currentTotal <= total &&
          previousPagesArray.indexOf(previousPage) < 0
        ) {
          previousPagesArray.push(previousPage);
        }
      }

      setPreviousPages(previousPagesArray.sort((a, b) => a - b));
    }
  }, [currentPage, limit, maxPreviousPages, total]);

  useEffect(() => {
    setCurrentPage(parseInt(page, 10));
  }, [page]);

  useEffect(() => {
    getNextPages();
  }, [currentPage, getNextPages]);

  useEffect(() => {
    getPreviousPages();
  }, [currentPage, getPreviousPages]);

  return (
    <Pagination>
      {previousPages.length > 0 &&
        previousPages.map((previousPage: number) => (
          <Button
            key={previousPage}
            type="button"
            variant="outline-primary"
            className="me-2"
            style={{ padding: "5px 13px" }}
            onClick={() => onChangePage(previousPage)}
          >
            {previousPage}
          </Button>
        ))}

      {currentPage && (
        <Button
          type="button"
          variant="primary"
          className="me-2"
          style={{ padding: "5px 15px" }}
        >
          {currentPage}
        </Button>
      )}

      {nextPages.length > 0 &&
        nextPages.map((nextPage: number) => (
          <Button
            key={nextPage}
            type="button"
            variant="outline-primary"
            className="me-2"
            style={{ padding: "5px 13px" }}
            onClick={() => onChangePage(nextPage)}
          >
            {nextPage}
          </Button>
        ))}
    </Pagination>
  );
}

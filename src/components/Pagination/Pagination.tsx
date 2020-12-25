import clsx from 'clsx';
import React, { useContext } from 'react';
import { LanguageContext } from '../../context';
import { PaginationInterface } from '../../shared/interface';
import classes from './Pagination.module.scss';
interface Props {
  pagination: PaginationInterface;
  loading: boolean;
  limits: number[];
  setPagination(data: PaginationInterface): void;
}
function Pagination(props: Props): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  const generatePages = (page: number, pages: number) => {
    const delta = 2;
    const left = page - delta;
    const right = page + delta + 1;
    const pagination: string[] = [];
    let prev: any = null;
    Array(pages)
      .fill(1)
      .map((x, y) => {
        const no = x + y;
        if (no === 1 || no === pages || (no >= left && no < right)) {
          return no;
        } else {
          return null;
        }
      })
      .filter((item) => {
        if (item) {
          if (prev) {
            if (item - prev === delta) {
              pagination.push(prev + 1);
            } else if (item - prev !== 1) {
              pagination.push('...');
            }
          }
          prev = item;
          pagination.push(item);
          return item;
        }
      });
    return pagination;
  };

  const changeLimit = (limit: number) => {
    if (props.pagination.limit !== limit) {
      props.setPagination({
        ...props.pagination,
        limit,
      });
    }
  };

  const changePage = (page: number) => {
    props.setPagination({
      ...props.pagination,
      page,
    });
  };

  const nextPage = () => {
    if (props.pagination.page < props.pagination.pages) {
      props.setPagination({
        ...props.pagination,
        page: props.pagination.page + 1,
      });
    }
  };

  const prevPage = () => {
    if (props.pagination.page > 1) {
      props.setPagination({
        ...props.pagination,
        page: props.pagination.page - 1,
      });
    }
  };

  const ifElse = (
    condition: boolean,
    ifComponent: JSX.Element,
    elseComponent: JSX.Element,
  ): JSX.Element => {
    return condition ? ifComponent : elseComponent;
  };
  return (
    <div className={clsx('clearfix', classes.pagination)}>
      {props.loading && <div className={classes.loading} />}
      {!!props.limits.length && (
        <div className={clsx('float-left', classes.paginationContainer)}>
          {props.limits.map((limit) => (
            <button
              key={limit}
              type="button"
              className={clsx(
                'btn',
                classes.btn,
                classes.btnSquare,
                props.pagination.limit === limit ? classes.active : '',
                props.pagination.limit === limit ? classes.limitActive : '',
              )}
              onClick={() => changeLimit(limit)}>
              {limit}
            </button>
          ))}
        </div>
      )}

      {props.pagination.pages !== 1 && (
        <div className={clsx('float-right', classes.paginationContainer)}>
          {generatePages(props.pagination.page, props.pagination.pages).map((page) => {
            if (Number(page) === props.pagination.page) {
              return (
                <button
                  type="button"
                  className={clsx(
                    'btn',
                    classes.btn,
                    classes.btnSquare,
                    classes.btnRound,
                    classes.active,
                    classes.pageActive,
                  )}>
                  {page}
                </button>
              );
            } else if (page === '...') {
              return <span>{page}</span>;
            } else {
              return (
                <button
                  type="button"
                  onClick={() => changePage(Number(page))}
                  className={clsx('btn', classes.btn, classes.btnSquare, classes.btnRound)}>
                  {page}
                </button>
              );
            }
          })}
          {ifElse(
            props.pagination.page > 1,
            <button
              type="button"
              onClick={prevPage}
              className={clsx('btn', classes.btn, classes.allowPageShift)}>
              {languageContext.state.lang === 'en' && <>Previous</>}
              {languageContext.state.lang === 'he' && <>קודם</>}
            </button>,
            <button type="button" disabled={true} className={clsx('btn', classes.btn)}>
              {languageContext.state.lang === 'en' && <>Previous</>}
              {languageContext.state.lang === 'he' && <>קודם</>}
            </button>,
          )}
          {ifElse(
            props.pagination.page < props.pagination.pages,
            <button
              type="button"
              onClick={nextPage}
              className={clsx('btn', classes.btn, classes.allowPageShift)}>
              {languageContext.state.lang === 'en' && <>Next</>}
              {languageContext.state.lang === 'he' && <>הבא</>}
            </button>,
            <button type="button" disabled={true} className={clsx('btn', classes.btn)}>
              {languageContext.state.lang === 'en' && <>Next</>}
              {languageContext.state.lang === 'he' && <>הבא</>}
            </button>,
          )}
        </div>
      )}
    </div>
  );
}

export default Pagination;

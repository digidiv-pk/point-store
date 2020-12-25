import React, { useEffect } from 'react';

interface Props {
  title: string;
}

function PageTitle(props: Props): JSX.Element {
  useEffect(() => {
    const element = document.getElementById('page-title');
    const title = document.querySelector('title');
    if (element) {
      element.innerText = props.title;
    }

    if (title) {
      title.innerText = props.title;
    }
  }, []);
  return <></>;
}

export default PageTitle;

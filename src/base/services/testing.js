import { act, render } from '@testing-library/react';
export * from '@testing-library/react';
export * as shadowDOM from 'shadow-dom-testing-library';
import userEvent from '@testing-library/user-event';

export async function pause(timeout){
  await new Promise(resolve => setTimeout(resolve, timeout));
}

export async function asyncMount(component){
  let result;
  const user = userEvent.setup();
  await act(async () => {
    result = render(component);
    await pause();
  });
  return { user, ...result };
}

export async function renderWebComponent(html){
  document.body.innerHTML = html;
  await pause();
  return {
    element: document.body.firstChild,
    user: userEvent.setup()
  };
}

export function teardownWebComponent(){
  const { firstChild } = document.body;
  firstChild && firstChild.remove();
}

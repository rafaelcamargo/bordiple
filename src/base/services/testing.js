import { act, render } from '@testing-library/react';
export * from '@testing-library/react';
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

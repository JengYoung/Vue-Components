export const getDelemeterCount = (value: string, delimeter: string) => {
  let cnt = 0;

  for (let i = 0; i < value.length; i += 1) {
    if (value[i] === delimeter) cnt += 1;
  }

  return cnt;
};

export const reassignDelemeter = (nowValue: string, blocks: number[], delimeter: string) => {
  let result = '';
  let blocksIndex = 0;

  for (let i = 0; i < nowValue.length; i += 1) {
    result += nowValue[i];

    if (i === blocks[blocksIndex] - 1 && i < nowValue.length - 1) {
      result += delimeter;
      blocksIndex += 1;
    }
  }

  return result;
};

export const getRefinedBlocks = (blocks: number[], prefix: string) => {
  const arr: number[] = [];
  blocks.forEach((val, idx) => {
    arr.push(val + (idx ? arr[idx - 1] : prefix.length));
  });

  return arr;
};

export const getOriginalValue = (
  value: string,
  options: { number: boolean; maxValue: number; prefix: string }
) => {
  let regex = '';

  if (options.prefix) {
    // prefix에 특수문자가 있다면 escape sequence를 따르도록 변환시켜준다.
    let refinedRegex = '';

    for (let i = 0; i < options.prefix.length; i += 1) {
      const now = options.prefix[i];
      if (now.charCodeAt(0) < 49) {
        refinedRegex += `\${now}`;
      } else {
        refinedRegex += now;
      }
    }

    regex += `^${refinedRegex}`;
  }

  if (options.number) {
    if (regex.length) {
      regex += '|';
    }
    regex += '[^0-9]';
  }

  const resultRegex = new RegExp(regex, 'g');

  return options.prefix + value.replace(resultRegex, '').slice(0, options.maxValue);
};

export const isPrefixChanged = (value: string, prefix: string) => !value.startsWith(prefix);

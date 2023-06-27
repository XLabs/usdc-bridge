import { isMainnet } from "@/constants";
import axios, { AxiosResponse } from "axios";
import { ethers } from "ethers";

const CIRCLE_ATTESTATION = isMainnet ? "https://iris-api.circle.com/attestations/" : "https://iris-api-sandbox.circle.com/attestations/";

export const findCircleMessageInLogs = (logs: ethers.providers.Log[], circleEmitterAddress: string): string | null => {
  for (const log of logs) {
    if (log.address.toLowerCase() === circleEmitterAddress.toLowerCase()) {
      const messageSentIface = new ethers.utils.Interface(["event MessageSent(bytes message)"]);
      return messageSentIface.parseLog(log).args.message as string;
    }
  }

  return null;
};

export async function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export async function getCircleAttestation(messageHash: ethers.BytesLike) {
  while (true) {
    // get the post
    const response = await axios
      .get(`${CIRCLE_ATTESTATION}${messageHash}`)
      .catch((reason) => {
        return null;
      })
      .then(async (response: AxiosResponse | null) => {
        if (response !== null && response.status === 200 && response.data.status === "complete") {
          return response.data.attestation as string;
        }

        return null;
      });

    if (response !== null) {
      return response;
    }

    await sleep(6500);
  }
}

export const handleCircleMessageInLogs = async (
  logs: ethers.providers.Log[],
  circleEmitterAddress: string
): Promise<[string | null, string | null]> => {
  const circleMessage = findCircleMessageInLogs(logs, circleEmitterAddress);

  if (circleMessage === null) {
    return [null, null];
  }

  const circleMessageHash = ethers.utils.keccak256(circleMessage);
  const signature = await getCircleAttestation(circleMessageHash);

  return [circleMessage, signature];
};

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  Asset,
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  SignExecuteContractMethodParams,
  SignExecuteScriptTxResult,
  signExecuteMethod,
  addStdIdToFields,
  encodeContractFields,
  Narrow,
} from "@alephium/web3";
import { default as FunnelContractJson } from "../Funnel.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";
import { Entries, AllStructs } from "./types";
import { RalphMap } from "@alephium/web3";

// Custom types for the contract
export namespace FunnelTypes {
  export type Fields = {
    count: bigint;
  };

  export type State = ContractState<Fields>;

  export type NewEntryEvent = ContractEvent<{
    by: Address;
    to: Address;
    agent: Address;
    value: bigint;
  }>;

  export interface CallMethodTable {
    createEntry: {
      params: CallContractParams<{ amt: bigint; to: Address; ag: Address }>;
      result: CallContractResult<null>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
  export type MulticallReturnType<Callss extends MultiCallParams[]> = {
    [index in keyof Callss]: MultiCallResults<Callss[index]>;
  };

  export interface SignExecuteMethodTable {
    createEntry: {
      params: SignExecuteContractMethodParams<{
        amt: bigint;
        to: Address;
        ag: Address;
      }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];

  export type Maps = { entries?: Map<bigint, Entries> };
}

class Factory extends ContractFactory<FunnelInstance, FunnelTypes.Fields> {
  encodeFields(fields: FunnelTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      AllStructs
    );
  }

  eventIndex = { NewEntry: 0 };
  consts = {
    ErrorCodes: {
      SelfPay: BigInt("0"),
      AgentPay: BigInt("1"),
      DataMalfunction: BigInt("2"),
      LackOfBal: BigInt("3"),
    },
  };

  at(address: string): FunnelInstance {
    return new FunnelInstance(address);
  }

  tests = {
    createEntry: async (
      params: TestContractParams<
        FunnelTypes.Fields,
        { amt: bigint; to: Address; ag: Address },
        FunnelTypes.Maps
      >
    ): Promise<TestContractResult<null, FunnelTypes.Maps>> => {
      return testMethod(this, "createEntry", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: FunnelTypes.Fields,
    asset?: Asset,
    address?: string,
    maps?: FunnelTypes.Maps
  ) {
    return this.stateForTest_(initFields, asset, address, maps);
  }
}

// Use this object to test and deploy the contract
export const Funnel = new Factory(
  Contract.fromJson(
    FunnelContractJson,
    "=6-1+f=13-2+61=10+7e011452756e6e696e672043726561746520456e747279=330+7a7e0214696e73657274206174206d617020706174683a2000=60",
    "16cb8b0d99ad3780227ac3c20f199e71ce8a8372f2fbf0fd0db27b46c2fa2264",
    AllStructs
  )
);
registerContract(Funnel);

// Use this class to interact with the blockchain
export class FunnelInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  maps = {
    entries: new RalphMap<bigint, Entries>(
      Funnel.contract,
      this.contractId,
      "entries"
    ),
  };

  async fetchState(): Promise<FunnelTypes.State> {
    return fetchContractState(Funnel, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeNewEntryEvent(
    options: EventSubscribeOptions<FunnelTypes.NewEntryEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      Funnel.contract,
      this,
      options,
      "NewEntry",
      fromCount
    );
  }

  view = {
    createEntry: async (
      params: FunnelTypes.CallMethodParams<"createEntry">
    ): Promise<FunnelTypes.CallMethodResult<"createEntry">> => {
      return callMethod(
        Funnel,
        this,
        "createEntry",
        params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    createEntry: async (
      params: FunnelTypes.SignExecuteMethodParams<"createEntry">
    ): Promise<FunnelTypes.SignExecuteMethodResult<"createEntry">> => {
      return signExecuteMethod(Funnel, this, "createEntry", params);
    },
  };
}

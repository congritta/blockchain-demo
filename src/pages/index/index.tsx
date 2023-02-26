/*
 * Copyright (c) 2023. Alex Congritta
 *
 * E-Mail: congritta@gmail.com
 * WebSite: https://congritta.com
 */

import {MD5} from "crypto-js";
import {useEffect, useState} from "react";
import TextareaAutosize from "react-textarea-autosize";
import ModalWindow from "../../components/ModalWindow";
import Table from "../../components/Table";
import {useAppSelector} from "../../store/hooks";
import * as commonStateStore from "../../store/reducers/common";

interface BlockchainRecord {
  textData: string,
  createdAt: Date,
  previousRecordHash: string|null
}

export default function IndexPage() {

  // Hooks
  const {language} = useAppSelector(commonStateStore.state);

  // State
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newRecordText, setNewRecordText] = useState("");
  const [blockchain, setBlockchain] = useState<BlockchainRecord[]>([]);
  const [inValidRecordId, setInvalidRecordId] = useState<number|null>(null);

  // Add record to blockchain function
  function addRecordToBlockchain() {
    const lastBlockchainRecord = blockchain.slice(-1)[0];

    const blockchainRecord: BlockchainRecord = {
      textData: newRecordText,
      createdAt: new Date(),
      previousRecordHash: lastBlockchainRecord ? MD5(JSON.stringify(lastBlockchainRecord)).toString() : null
    };

    setBlockchain([...blockchain, blockchainRecord]);
    setNewRecordText("");
    setIsPopupOpen(false);
  }

  // Change blockchain record function
  function changeBlockchainRecord(nodeId: number, textData: string) {
    const $blockchain = [...blockchain];
    $blockchain[nodeId].textData = textData;
    setBlockchain($blockchain);
  }

  // Verify blockchain function
  function verifyBlockchain() {
    setInvalidRecordId(null);

    let previousRecord = blockchain[0];

    if(!previousRecord) {
      return;
    }
    const foundIndex = blockchain.slice(1).findIndex((record) => {

      const previousRecordHash = MD5(JSON.stringify(previousRecord)).toString();
      const previousRecordHashShouldBe = record.previousRecordHash;

      previousRecord = record;

      return previousRecordHash !== previousRecordHashShouldBe;
    });

    setInvalidRecordId(foundIndex !== -1 ? foundIndex : null);
  }

  // Verify blockchain on changes
  useEffect(() => {
    verifyBlockchain();
  }, [blockchain]);

  // Render
  return (
    <div className="IndexPage">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1>Blockchain demo</h1>

        <button className="isAutowidth" onClick={() => setIsPopupOpen(true)}>
          {language === "ru" ? ("Добавить запись") : ("Add a record")}
        </button>
      </div>

      {language === "ru" ? (
        <p>
          Эта таблица представляет собой самый простой блокчейн
        </p>
      ) : (
        <p>
          Simply add some info to table. The table is Blockchain
        </p>
      )}

      <Table
        headers={language === "ru" ? (
          ["#", "Текст", "Дата создания", "Хэш предыдущей записи", "Запись валидна"]
        ) : (
          ["#", "Text data", "Created at", "Prev record hash", "Record is valid"]
        )}
        data={blockchain.map((record, i) => (
          [
            i + 1,
            <TextareaAutosize
              value={record.textData}
              onChange={({target: {value}}) => changeBlockchainRecord(i, value)}
            />,
            record.createdAt.toLocaleString(),
            record.previousRecordHash,
            String(typeof inValidRecordId === "number" ? i < inValidRecordId : true)
          ]
        ))}
      />

      <hr />

      {language === "ru" ? (<>
        <h2>О блокчейне</h2>

        <p>
          Блокчейн - технология, которая используется для хранения истории чего-то (чаще всего используется в
          криптовалюте для хранения истории транзакций).
          В блокчейне каждая запись не подлежит изменению, удалению или изменению порядка записей в списке. Если такое
          произойдёт, то все последующие записи в блокчейне
          станут невалидными (то есть, запись будет помечена как недействительна/изменённая и т.п.).
        </p>

        <p>
          На этой странице представлен самый простой блокчейн. Вы можете добавить запись в таблицу, а потом попробовать
          изменить её и наглядно увидеть как работает блокчейн.
        </p>

        <p>
          Ваши добавленные записи никуда не сохраняются и никуда не отправляются. После обновления страницы в браузере,
          все записи будут удалены
        </p>

        <p>
          Для того, чтобы проверять записи в блокчейне на валидность, используется хэширование. Хэширование - снятие
          электронного слепка с входных данных. При этом длина этого "слепка" всегда одинакова.
          Таким образом, каждая запись в блокчейне хранит в себе слепок предыдущей. Если запись в блокчейне поменять,
          слепки перестанут совпадать у всех последующих записей, поэтому они станут невалидными
        </p>
      </>) : (<>

        <h2>What is Blockchain</h2>

        <p>
          Blockchain is a technology that allows to store a log of something. Blockchain is usually using in
          cryptocurrencies to store transactions history.
          Every record in blockchain is not able to be edited, deleted or resorted. If it is happen, all next records
          become invalid
        </p>

        <p>
          In this site, you can add any text info to blockchain and then try to change your text records. You will see
          which records are valid or invalid
        </p>

        <p>
          All your records store only in your browser and are not sending to any server. Whole blockchain will be
          cleared after page refresh
        </p>

        <p>
          In order to check the validity of records in the blockchain, hashing is used. Hashing is taking a fingerprint
          from the input data. The length of this fingerprint is always the same.
          Thus, each record in the blockchain keeps a hash of the previous one. If an record in the blockchain is
          changed, the hashes will no longer match for all subsequent entries, so they will become invalid
        </p>

      </>)}

      {/* Add record popup */}
      <ModalWindow
        title={language === "ru" ? "Добавление записи" : "Add blockchain record"}
        isShown={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      >
        <div className="field-wrapper">
          <TextareaAutosize
            value={newRecordText}
            onChange={({target: {value}}) => setNewRecordText(value)}
            minRows={3}
            placeholder={language === "ru" ? "Любой текст..." : "Any text data..."}
          />
        </div>

        <div className="field-wrapper">
          <button className="isAutowidth" onClick={() => addRecordToBlockchain()}>Done</button>
        </div>
      </ModalWindow>
    </div>
  );
}
